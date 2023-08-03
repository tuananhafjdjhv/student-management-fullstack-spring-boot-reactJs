package ra.service.clazz;

import ra.dto.ClassDTO;
import ra.model.Class;

import java.util.List;

public interface IClassService {
    List<ClassDTO> findAllClass();
    Class findById(Long id);
    Class findByClassName(String name);

    Class save(Class clazz);
}
