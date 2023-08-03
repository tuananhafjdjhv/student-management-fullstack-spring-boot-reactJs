package ra.service.clazz;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ra.dto.ClassDTO;
import ra.model.Class;
import ra.repository.IClassRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassService implements  IClassService{
    @Autowired
    private IClassRepository classRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<ClassDTO> findAllClass() {
        return classRepository.findAllClass()
                .stream().map(c ->  modelMapper.map(c, ClassDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Class findById(Long id) {
        return classRepository.findById(id).get();
    }

    @Override
    public Class findByClassName(String name) {
        return null;
    }

    @Override
    public Class save(Class clazz) {
        return classRepository.save(clazz);
    }
}
