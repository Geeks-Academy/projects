import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @ApiTags('Projects')
  @Get(':userId/all')
  getAllProjects(@Param('userId') userId: string) {
    return this.projectsService.findAllProjects(userId);
  }

  @ApiTags('Projects')
  @Get(':userId/creator')
  getAllProjectsByCreator(@Param('userId') userId: string) {
    return this.projectsService.findAllProjectsByCreator(userId);
  }

  @ApiTags('Projects')
  @Get(':userId/contributes')
  getAllProjectsByContributes(@Param('userId') userId: string) {
    return this.projectsService.findAllProjectsByContributions(userId);
  }

  @ApiTags('Projects')
  @Get(':projectId')
  getOneProjectById(@Param('projectId') projectId: string) {
    return this.projectsService.findOneProjectById(projectId);
  }

  @ApiTags('Projects')
  @Post('create')
  createProject(@Body() data: CreateProjectDto) {
    return this.projectsService.createProject(data);
  }

  @ApiTags('Projects')
  @Put(':project/update')
  updateProject(
    @Param('projectId') projectId: string,
    @Body() data: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(projectId, data);
  }

  @ApiTags('Projects')
  @Delete(':projectId/delete')
  deleteProject(@Param('projectId') projectId: string) {
    return this.projectsService.removeProject(projectId);
  }

  @ApiTags('Contributions')
  @Get(':userId/join/:projectId')
  joinToProjectContribution(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.projectsService.joinToProjectContribution(projectId, userId);
  }

  @ApiTags('Contributions')
  @Get(':userId/leave/:projectId')
  leaveFromProjectContribution(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.projectsService.leaveFromProjectContribution(projectId, userId);
  }
}
