package com.ricksredditclone.backend.repository;

import com.ricksredditclone.backend.model.Post;
import com.ricksredditclone.backend.model.User;
import com.ricksredditclone.backend.model.Vote;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface VoteRepository extends CrudRepository<Vote, Long> {
    Optional<Vote> findTopByPostAndUserOrderByVoteIdDesc(Post post, User currentUser);
}
