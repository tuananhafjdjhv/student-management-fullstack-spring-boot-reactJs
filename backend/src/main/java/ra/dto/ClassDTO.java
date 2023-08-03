package ra.dto;

import lombok.*;
import ra.model.Student;
import ra.model.Teacher;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClassDTO {
    private Long classId;
    private String className;
    private Long teacherId;
}
