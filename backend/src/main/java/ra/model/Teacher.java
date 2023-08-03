package ra.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ra.dto.StudentDTO;

import javax.persistence.*;
import java.util.List;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
//@NamedStoredProcedureQuery(name = "find_student_by_class_id",
//        procedureName = "find_student_by_class_id", parameters = {
//        @StoredProcedureParameter(mode = ParameterMode.IN, name = "teacherId", type = Long.class),
//        @StoredProcedureParameter(mode = ParameterMode.IN, name = "teacherName", type = String.class)},
//        resultSetMappings = "find_student_by_class_id"
//)
//@SqlResultSetMapping(name = "find_student_by_class_id",
//        classes = @ConstructorResult(
//                targetClass = StudentDTO.class,
//                columns = {
//                        @ColumnResult(name = "studentId", type = Long.class),
//                        @ColumnResult(name = "studentName", type = String.class),
//                        @ColumnResult(name = "classId", type = Long.class),
//                        @ColumnResult(name = "className", type = String.class),
//                        @ColumnResult(name = "teacherId", type = Long.class),
//                        @ColumnResult(name = "teacherName", type = String.class)
//                }
//        )
//)
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teacherId;

    private String teacherName;

    @OneToMany(mappedBy = "teacher")
    private List<Class> classes;
}