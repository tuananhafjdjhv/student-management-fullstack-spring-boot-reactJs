package ra.service.student;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ra.dto.StudentDTO;
import ra.model.Student;
import ra.repository.IClassRepository;
import ra.repository.IStudentRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService implements IStudentService{
    @Autowired
    private IStudentRepository studentRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<StudentDTO> findByClassId(Long id) {
        List<StudentDTO> studentDTO = studentRepository.findByClassId(id);
        return studentDTO.stream()
                .map(s-> modelMapper.map(s, StudentDTO.class))
                .collect(Collectors.toList());
    }
}
