package ra.service.student;

import ra.dto.StudentDTO;
import ra.model.Student;

import java.util.List;
import java.util.Optional;

public interface IStudentService {
    List<StudentDTO> findByClassId(Long id);
}
