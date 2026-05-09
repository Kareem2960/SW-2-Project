package com.taskflow.auth.repository;

import com.taskflow.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u WHERE u.userName = :userName")
    Optional<User> findByUserName(@Param("userName") String userName);

    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.userName = :userName")
    boolean existsByUserName(@Param("userName") String userName);

    @Query("SELECT u FROM User u JOIN UserRole ur ON u.id = ur.user.id JOIN Role r ON ur.role.id = r.id WHERE r.name = :roleName AND u.isApproved = true")
    List<User> findByRoleNameAndApproved(@Param("roleName") String roleName);
}
