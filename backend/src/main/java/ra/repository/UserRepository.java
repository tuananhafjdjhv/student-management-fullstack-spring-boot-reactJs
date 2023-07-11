package ra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ra.model.User;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User,Long> {
    List<User> findUserByNameContaining(String name);

    @Modifying
    @Query("UPDATE User e SET e.status = 0 WHERE e.id = :unBlockId")
    void blockUser(Long unBlockId);
    @Modifying
    @Query("UPDATE User e SET e.status = 1 WHERE e.id = :blockId")
    void unBlockUser(Long blockId);

    Boolean existsByEmail(String email);

    Boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);
}
