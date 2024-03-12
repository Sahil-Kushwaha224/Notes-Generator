package com.notesServer.services.notes;

import com.notesServer.dto.TaskDto;
import com.notesServer.entities.Notes;

import java.util.List;

public interface NotesService {

    Notes createTask(TaskDto taskDTO);

    List<Notes> getLatestTasksForUser(Long userId);
}
