package ra.service.user;


import ra.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> findUserByName(String name);
    Optional<User> findByUsername(String name); //Tim kiem User co ton tai trong DB khong?
    Boolean existsByUsername(String username); //username da co trong DB chua, khi tao du lieu
    Boolean existsByEmail(String email); //email da co trong DB chua
    User save(User user);
    List<User> findAll();
    Optional<User> findUserById(Long id);

}
