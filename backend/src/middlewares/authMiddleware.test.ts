// backend/src/middlewares/authMiddleware.test.ts

import request from 'supertest'
import express from 'express'
import { protect } from './authMiddleware'
import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())

// Mock Protected Route
app.get('/protected', protect, (req, res) => {
  res.status(200).json({ message: 'Access granted', user: req.user })
})

// Connect to in-memory MongoDB for testing
beforeAll(async () => {
  const mongoURI = 'mongodb://localhost:27017/spectre_insights_test'
  await mongoose.connect(mongoURI)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe('Protect Middleware', () => {
  it('should deny access without token', async () => {
    const res = await request(app).get('/protected')
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Not authorized, no token')
  })

  it('should deny access with invalid token', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalidtoken')
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Not authorized, token failed')
  })

  it('should grant access with valid token', async () => {
    // Create a test user
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    })
    await testUser.save()

    // Generate JWT
    const token = jwt.sign({ user: { id: testUser.id } }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    })

    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Access granted')
    expect(res.body.user.email).toBe('test@example.com')
  })
})
