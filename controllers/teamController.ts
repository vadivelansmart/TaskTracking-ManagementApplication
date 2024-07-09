

import { Request, Response } from 'express';
import { Team, TeamMember } from '../models'
import { ITeam, ITeamMember } from '../dto';
import {
    ERROR_FETCHING_TEAMS, FAILED_TO_ADD_MEMBER, FAILED_TO_CREATE_TEAM, FAILED_TO_FETCH_TEAM_MEMBERS, MEMBER_ADDED_SUCCESSFULLY,
    ONLY_ADMINS_CAN_ADD_MEMBERS, ONLY_ADMINS_CAN_CREATE_TEAM, USER_ALREADY_MEMBER
} from '../constants';

export const createTeam = async (req: any, res: Response) => {
    try {
        const user = req.user;
        if (user.role !== 'admin') {
            return res.status(403).json({ message: ONLY_ADMINS_CAN_CREATE_TEAM });
        }
        const teamDTO: ITeam = req.body;
        const newTeam = new Team(teamDTO);
        await newTeam.save();

        return res.status(201).json(newTeam);
    } catch (error) {
        return res.status(500).json({ message: FAILED_TO_CREATE_TEAM });
    }
};

export const addTeamMember = async (req: any, res: Response) => {
    try {
        const { userId, teamId } = <ITeamMember>req.body;
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: ONLY_ADMINS_CAN_ADD_MEMBERS });
        }

        const existingMembership = await TeamMember.findOne({ user: userId, team: teamId });
        if (existingMembership) {
            return res.status(400).json({ message: USER_ALREADY_MEMBER });
        }

        const newMembership = new TeamMember({ user: userId, team: teamId });
        await newMembership.save();

        return res.status(201).json({ message: MEMBER_ADDED_SUCCESSFULLY, teamMembership: newMembership });
    } catch (error) {
        return res.status(500).json({ message: FAILED_TO_ADD_MEMBER });
    }
};

export const getTeamMembers = async (req: Request, res: Response) => {
    try {
        const { teamId } = req.query;
        const teamMembers = await TeamMember.find({ team: teamId }).populate('user', '-password');
        return res.status(200).json({ teamMembers });
    } catch (error) {
        return res.status(500).json({ message: FAILED_TO_FETCH_TEAM_MEMBERS });
    }
};
export const getAllTeams = async (req: Request, res: Response) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: ERROR_FETCHING_TEAMS });
    }
}


