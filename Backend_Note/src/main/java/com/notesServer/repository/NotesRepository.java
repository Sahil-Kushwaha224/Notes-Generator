package com.notesServer.repository;

import com.notesServer.entities.Notes;
import com.notesServer.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface NotesRepository extends JpaRepository<Notes, Long> {

    List<Notes> findTop10ByUserOrderByCreatedDateDesc(User user);

    List<Notes> findAllByUser(User user);
}
