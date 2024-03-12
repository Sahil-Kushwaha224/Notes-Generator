package com.notesServer.dto;

import com.notesServer.entities.User;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;

@Data
public class TaskDto {

    private Long id;

    private String title;

    @Size(max = 500, message = "Description should not exceed 500 characters")
    private String description;

    private Date createdDate;

    private Long userId;
}
