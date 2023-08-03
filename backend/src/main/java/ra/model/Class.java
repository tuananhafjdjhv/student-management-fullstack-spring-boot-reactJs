package ra.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ra.dto.ClassDTO;
import ra.dto.StudentDTO;

import javax.persistence.*;
import java.util.List;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@NamedStoredProcedureQuery(name = "find_all_class",
        procedureName = "find_all_class",
        resultSetMappings = "find_all_class"
)
@SqlResultSetMapping(name = "find_all_class",
        classes = @ConstructorResult(
                targetClass = ClassDTO.class,
                columns = {
                        @ColumnResult(name = "classId", type = Long.class),
                        @ColumnResult(name = "className", type = String.class),
                        @ColumnResult(name = "teacherId", type = Long.class),
                }
        )
)
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long classId;

    private String className;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @OneToMany(mappedBy = "clazz")
    private List<Student> students;

}
