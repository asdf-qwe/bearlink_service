package com.ll.blog.domain.post.post.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    @NotNull
    private Long id;

    private String string;

    private String content;

    private String author;
}
