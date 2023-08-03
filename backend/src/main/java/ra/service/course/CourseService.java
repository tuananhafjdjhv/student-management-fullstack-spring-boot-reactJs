package ra.service.course;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ra.dto.ClassDTO;
import ra.dto.CourseDTO;
import ra.repository.ICourseRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService implements  ICourseService{
    @Autowired
    private ICourseRepository courseRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CourseDTO> findAllCourse() {
          return courseRepository.findAllCourse()
                .stream().map(c ->  modelMapper.map(c, CourseDTO.class))
                .collect(Collectors.toList());
    }
}
