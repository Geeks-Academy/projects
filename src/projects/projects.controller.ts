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

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body('userId') userId: number, @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(+userId, createProjectDto);
  }

  @Get()
  findAll(@Body('userId') userId: number) {
    return this.projectsService.findAll(+userId);
  }

  @Get(':id')
  findOne(@Body('userId') userId: number, @Param('id') id: number) {
    return this.projectsService.findOne(+userId, +id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('userId') userId: number, @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.update(+userId, +id, createProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Body('userId') userId: number) {
    return this.projectsService.remove(userId, +id);
  }
}
