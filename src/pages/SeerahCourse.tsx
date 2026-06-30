import React from 'react';
import { CourseRoadmap } from '../components/CourseRoadmap';

/**
 * /academy renders the roadmap for whichever course is active
 * (chosen from the Course Catalog). The roadmap owns its own header.
 */
export const SeerahCourse: React.FC = () => {
  return <CourseRoadmap />;
};
