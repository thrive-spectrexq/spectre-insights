// src/controllers/siteSettingsController.ts
import { Request, Response } from 'express';
import SiteSettings from '../models/SiteSettings';

export const getSiteSettings = async (req: Request, res: Response) => {
    const settings = await SiteSettings.findOne();
    res.json(settings);
};

export const updateSiteSettings = async (req: Request, res: Response) => {
    const { siteName, contactEmail } = req.body;
    const settings = await SiteSettings.findOneAndUpdate({}, { siteName, contactEmail }, { new: true });
    res.json(settings);
};
