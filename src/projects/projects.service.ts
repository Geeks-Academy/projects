import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './interfaces/project.interface';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('project') private project: Model<Project>) {}

  findAllProjects(userId: string) {
    return this.project
      .find({
        $or: [
          {
            creator: userId,
          },
          {
            contributors: {
              $in: [userId],
            },
          },
        ],
      })
      .exec();
  }

  findAllProjectsByCreator(userId: string) {
    return this.project
      .find({
        creator: userId,
      })
      .exec();
  }

  findAllProjectsByContributions(userId: string) {
    return this.project
      .find({
        contributors: {
          $in: [userId],
        },
      })
      .exec();
  }

  findOneProjectById(id: string) {
    return this.project
      .findOne({
        _id: id,
      })
      .exec();
  }

  joinToProjectContribution(id: string, userId: string) {
    return this.project.update(
      { _id: id },
      { $push: { contributors: userId } },
    );
  }

  leaveFromProjectContribution(id: string, userId: string) {
    return this.project.update(
      { _id: id },
      { $pull: { contributors: userId } },
    );
  }

  createProject(data: CreateProjectDto) {
    return this.project.create(data);
  }

  updateProject(id: string, data: UpdateProjectDto) {
    return this.project.update({ _id: id }, data);
  }

  removeProject(id: string) {
    return this.project.deleteOne({ _id: id });
  }
}
