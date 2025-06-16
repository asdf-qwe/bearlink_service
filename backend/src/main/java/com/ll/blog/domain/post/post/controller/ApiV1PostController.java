package com.ll.blog.domain.post.post.controller;

import com.ll.blog.domain.post.post.dto.PostDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Tag(name = "ApiV1PostController", description = "API 게시글 컨트롤러")
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class ApiV1PostController {
    @GetMapping
    @Operation(summary = "게시글 다건조회")
    public List<PostDto> getPosts() {
        ArrayList<PostDto> postDtoList = new ArrayList<>();

        postDtoList.add(new PostDto(1L, "제목1", "내용1", "작성자1"));
        postDtoList.add(new PostDto(2L, "제목2", "내용2", "작성자2"));
        postDtoList.add(new PostDto(3L, "제목3", "내용3", "작성자3"));
        postDtoList.add(new PostDto(4L, "제목4", "내용4", "작성자4"));
        postDtoList.add(new PostDto(5L, "제목5", "내용5", "작성자5"));
        return postDtoList;
    }

    @GetMapping("/{id}")
    @Operation(summary = "게시글 단건조회")
    public PostDto getPost(@PathVariable Long id) {
        ArrayList<PostDto> postDtoList = new ArrayList<>();

        return new PostDto(id, "제목1", "내용1", "작성자1");
    }
}
