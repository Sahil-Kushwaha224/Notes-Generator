package com.notesServer.controller;


import com.notesServer.dto.TaskDto;
import com.notesServer.entities.Notes;
import com.notesServer.services.notes.NotesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NotesController {

    @Autowired
    private NotesService notesService;

    @PostMapping
    public ResponseEntity<Notes> createTask(@RequestBody @Valid TaskDto taskDTO) {
        Notes createdNotes = notesService.createTask(taskDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNotes);
    }

    @GetMapping("/latest/{userId}")
    public ResponseEntity<List<Notes>> getLatestTasksForUser(@PathVariable Long userId) {
        List<Notes> latestNotes = notesService.getLatestTasksForUser(userId);

        return ResponseEntity.ok(latestNotes);
    }
}
