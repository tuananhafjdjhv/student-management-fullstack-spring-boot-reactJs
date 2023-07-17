package ra.service.user;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ra.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> findUserByName(String name);
    Optional<User> findByUsername(String name); //Tim kiem User co ton tai trong DB khong?
    Boolean existsByUsername(String username); //username da co trong DB chua, khi tao du lieu
    Boolean existsByEmail(String email); //email da co trong DB chua
    User save(User user);
    Page<User> findAll(Pageable pageable);
    Optional<User> findUserById(Long id);

}
