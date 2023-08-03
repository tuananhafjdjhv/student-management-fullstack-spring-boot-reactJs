package ra.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ra.dto.ClassDTO;
import ra.dto.CourseDTO;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@NamedStoredProcedureQuery(name = "find_all_course",
        procedureName = "find_all_course",
        resultSetMappings = "find_all_course"
)
@SqlResultSetMapping(name = "find_all_course",
        classes = @ConstructorResult(
                targetClass = CourseDTO.class,
                columns = {
                        @ColumnResult(name = "courseId", type = Long.class),
                        @ColumnResult(name = "courseName", type = String.class),
                        @ColumnResult(name = "image", type = String.class),
                        @ColumnResult(name = "description", type = String.class),
                        @ColumnResult(name = "status", type = boolean.class)
                }
        )
)
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    private String courseName;

    @ManyToMany
    @JoinTable(
            name = "course_class",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "class_id")
    )
    private List<Class> classes;

    @Lob
    private String image;

    @Lob
    private String description;
    private boolean status;
}
