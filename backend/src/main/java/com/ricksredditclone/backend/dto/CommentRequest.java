package com.ricksredditclone.backend.dto;

import com.ricksredditclone.backend.model.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {
    private Long id;
    private String text;
    private Long postId;
}
