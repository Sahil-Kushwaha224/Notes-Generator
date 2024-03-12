package com.notesServer.services.notes;

import com.notesServer.dto.TaskDto;
import com.notesServer.entities.Notes;
import com.notesServer.entities.User;
import com.notesServer.exceptions.ValidationException;
import com.notesServer.repository.NotesRepository;
import com.notesServer.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class NotesServiceImpl implements NotesService {

    @Autowired
    private NotesRepository notesRepository;

    @Autowired
    private UserRepository userRepository;

    public Notes createTask(TaskDto taskDTO) {
        // Retrieve the user by user id from the database
        User user = userRepository.findById(taskDTO.getUserId())
                .orElseThrow(() -> new ValidationException("User not found"));

        // Create a new task and associate it with the user
        Notes notes = new Notes();
        notes.setTitle(taskDTO.getTitle());
        notes.setDescription(taskDTO.getDescription());
        notes.setUser(user);
        notes.setCreatedDate(new Date()); // Set the creation timestamp

        // Save the task to the database
        return notesRepository.save(notes);
    }

    public List<Notes> getLatestTasksForUser(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Retrieve the latest 10 tasks for the user
        List<Notes> latestNotes = notesRepository.findTop10ByUserOrderByCreatedDateDesc(user);
        return latestNotes;
    }

    @Scheduled(cron = "0 0 * * * *") // Run every hour
    //@Scheduled(cron = "0 */5 * * * *")
    public void deleteOldNotes() {
        System.out.println("Auto deletion started");
        List<User> userList = userRepository.findAll();
        userList.forEach(user -> {
            List<Notes> recentNotes = notesRepository.findTop10ByUserOrderByCreatedDateDesc(user);
            List<Notes> allNotes = notesRepository.findAllByUser(user);

            // Identify notes to delete
            List<Notes> notesToDelete = new ArrayList<>(allNotes);
            notesToDelete.removeAll(recentNotes);

            notesRepository.deleteAll(notesToDelete);
            System.out.println("Notes deleted");
        });
        System.out.println("Auto deletion ended");
    }
}
