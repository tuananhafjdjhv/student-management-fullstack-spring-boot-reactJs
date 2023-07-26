package ra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ra.model.User;
import ra.model.UserData;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface IUserDataRepository extends JpaRepository<UserData,Long> {

}
