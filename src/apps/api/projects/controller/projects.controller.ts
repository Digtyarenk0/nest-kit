import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { User } from 'shared/database/entities/users/user.entity';

import { CurrentUser } from 'shared/common/auth/decorators/current-user.decorator';
import { UseAuthGuard } from 'shared/common/auth/guards/auth.guard';

import { ProjectsService } from '../service/projects.service';

import { CreateProjectDto } from '../dto/create-project.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new project' })
  @ApiResponse({ status: 201, description: 'Project successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @UseAuthGuard()
  create(
    @CurrentUser() user: User,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(user, createProjectDto.path);
  }

  @Get()
  @UseAuthGuard()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'List of all projects' })
  getUserProjects(@CurrentUser() user: User) {
    return this.projectsService.findUserProjects(user);
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get project by ID' })
  // @ApiResponse({ status: 200, description: 'Project found' })
  // @ApiResponse({ status: 404, description: 'Project not found' })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.projectsService.findOne(id);
  // }
}
