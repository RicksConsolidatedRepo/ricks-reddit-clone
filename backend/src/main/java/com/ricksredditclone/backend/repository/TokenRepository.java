package com.ricksredditclone.backend.repository;

import com.ricksredditclone.backend.model.AccountVerificationToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TokenRepository extends CrudRepository<AccountVerificationToken, Long> {
    Optional<AccountVerificationToken> findByToken(String token);
}
