import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Projects } from './interfaces/projects.interface';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Projects') private projectsModel: Model<Projects>) {}

  async create(userId: number, createProjectDto: CreateProjectDto): Promise<Projects> {
    const user = await this.projectsModel.find({ userId: userId}).exec();
    // If user not exist create new record
    if (!user[0]){
      const newProject = await new this.projectsModel(createProjectDto).save();
      return newProject;
    // If user exist create new record in user's projects
    } else {
      const newProject = await this.projectsModel
      .findOne({ userId: userId })
      .exec();
      newProject.projects.push(createProjectDto.projects[0]);
      return newProject.save();
    }
  }

  // Get all projects for user
  async findAll(userId: number): Promise<Projects[]> {
    const projects = await this.projectsModel.find({ userId: userId }).exec();
    return projects;
  }

  // Get project with a #${id}
  async findOne(userId: number, projectId: number): Promise<Projects> {
    const project = await this.projectsModel
      .findOne({ userId: userId })
      .exec();
    const newProject = project.projects.filter((el) => el._id === projectId);
    project.projects.splice(0, project.projects.length);
    project.projects.push(...newProject);
    return project;
  }
  // Update one of user's project where _id equal to projectId
  async update(userId, projectId: number, createProjectDto: CreateProjectDto): Promise<Projects> {
    const updatedProject = await this.projectsModel
      .findOne({ userId: userId })
      .exec();
    const indexOfUpdated = updatedProject.projects.findIndex(el => el._id === projectId);
    console.log(indexOfUpdated);
    updatedProject.projects.splice(indexOfUpdated, 1, createProjectDto.projects[0]);
    console.log(updatedProject.projects);
    await updatedProject.save();
    // return updated doc
    updatedProject.projects.splice(0, updatedProject.projects.length)
    updatedProject.projects.push(createProjectDto.projects[0])
    return updatedProject;
  }

  // Delete project with _id equals to projectId
  async removeProject(userId: number, projectId: number): Promise<any> {
    const deletedProject = await this.projectsModel
      .findOne({ userId: userId })
      .exec();
    const indexOfDeleted = deletedProject.projects.findIndex(el => el._id === projectId);
    deletedProject.projects.splice(indexOfDeleted, 1);
    await deletedProject.save();
    return deletedProject;
  }
  // Delete whole record
  async remove(userId: number): Promise<any> {
    const deletedUser = await this.projectsModel
      .findOneAndDelete({ userId: userId })
      .exec();
    return deletedUser;
  }
}
