package ra.dto;

import lombok.*;
import ra.model.Class;
import ra.model.Student;
import ra.model.Teacher;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentDTO {
    private Long studentId;
    private String studentName;
    private Long classId;
    private String className;
    private Long teacherId;
    private String teacherName;
}
