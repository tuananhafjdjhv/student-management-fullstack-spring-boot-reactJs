package ra.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ra.dto.StudentDTO;

import javax.persistence.*;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@NamedStoredProcedureQuery(name = "find_student_by_class_id",
        procedureName = "find_student_by_class_id", parameters = {
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "classId", type = Long.class)},
        resultSetMappings = "student_find_student_by_class_id"
)
@SqlResultSetMapping(name = "student_find_student_by_class_id",
        classes = @ConstructorResult(
                targetClass = StudentDTO.class,
                columns = {
                        @ColumnResult(name = "studentId", type = Long.class),
                        @ColumnResult(name = "studentName", type = String.class),
                        @ColumnResult(name = "classId", type = Long.class),
                        @ColumnResult(name = "className", type = String.class),
                        @ColumnResult(name = "teacherId", type = Long.class),
                        @ColumnResult(name = "teacherName", type = String.class)
                }
        )
)

public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    private String studentName;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Class clazz;

    @OneToOne
    @JoinColumn(name = "id")
    private User user;
}
