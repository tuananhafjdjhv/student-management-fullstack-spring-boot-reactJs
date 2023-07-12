package ra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ra.model.Class;

import java.util.List;

@Repository
public interface IClassRepository extends JpaRepository<Class,Long> {


}
