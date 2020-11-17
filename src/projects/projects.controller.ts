import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBody, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @ApiTags('Projects')
  @ApiParam({
    name: 'userId',
    example: '5fb430b9f4f6d2e1c2e49b49',
  })
  @Get(':userId/all')
  async getAllProjects(@Param('userId') userId: string) {
    const projects = await this.projectsService.findAllProjects(userId);

    if (!projects.length)
      throw new NotFoundException("User don't have project.");

    return projects;
  }

  @ApiTags('Projects')
  @ApiParam({
    name: 'userId',
    example: '5fb430b9f4f6d2e1c2e49b49',
  })
  @Get(':userId/creator')
  async getAllProjectsByCreator(@Param('userId') userId: string) {
    const projects = await this.projectsService.findAllProjectsByCreator(
      userId,
    );

    if (!projects.length) throw new NotFoundException();

    return projects;
  }

  @ApiTags('Projects')
  @ApiParam({
    name: 'userId',
    example: '5fb430b9f4f6d2e1c2e49b49',
  })
  @Get(':userId/contributes')
  async getAllProjectsByContributes(@Param('userId') userId: string) {
    const projects = await this.projectsService.findAllProjectsByContributions(
      userId,
    );

    if (!projects.length) throw new NotFoundException();

    return projects;
  }

  @ApiTags('Projects')
  @ApiParam({
    name: 'projectId',
    example: '5fb43167056d8c29ec6a160a',
  })
  @Get(':projectId')
  async getOneProjectById(@Param('projectId') projectId: string) {
    const projects = await this.projectsService.findOneProjectById(projectId);

    if (!projects) throw new NotFoundException();

    return projects;
  }

  @ApiTags('Projects')
  @Post('create')
  async createProject(@Body() data: CreateProjectDto) {
    return this.projectsService.createProject(data);
  }

  @ApiTags('Projects')
  @ApiParam({
    name: 'projectId',
    example: '5fb43167056d8c29ec6a160a',
  })
  @Put(':project/update')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() data: UpdateProjectDto,
  ) {
    const project = await this.projectsService.findOneProjectById(projectId);

    if (!project) throw new NotFoundException('Project not found.');

    return this.projectsService.updateProject(projectId, data);
  }

  @ApiTags('Projects')
  @ApiParam({
    name: 'projectId',
    example: '5fb43167056d8c29ec6a160a',
  })
  @Delete(':projectId/delete')
  async deleteProject(@Param('projectId') projectId: string) {
    const project = await this.projectsService.findOneProjectById(projectId);

    if (!project) throw new NotFoundException('Project not found.');

    return this.projectsService.removeProject(projectId);
  }

  @ApiTags('Contributions')
  @ApiParam({
    name: 'userId',
    example: '5fb43167056d8c29ec6a160a',
  })
  @ApiParam({
    name: 'projectId',
    example: '5fb43167056d8c29ec6a160a',
  })
  @Get(':userId/join/:projectId')
  async joinToProjectContribution(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
  ) {
    const project = await this.projectsService.findOneProjectById(projectId);

    if (!project) throw new NotFoundException('Project not found.');

    return this.projectsService.joinToProjectContribution(projectId, userId);
  }

  @ApiTags('Contributions')
  @ApiParam({
    name: 'userId',
    example: '5fb43167056d8c29ec6a160a',
  })
  @ApiParam({
    name: 'projectId',
    example: '5fb43167056d8c29ec6a160a',
  })
  @Get(':userId/leave/:projectId')
  async leaveFromProjectContribution(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
  ) {
    const project = await this.projectsService.findOneProjectById(projectId);

    if (!project) throw new NotFoundException('Project not found.');

    return this.projectsService.leaveFromProjectContribution(projectId, userId);
  }
}
