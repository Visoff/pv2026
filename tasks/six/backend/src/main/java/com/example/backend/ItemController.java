package com.example.backend;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(originPatterns = { "http://localhost:*", "http://127.0.0.1:*" })
public class ItemController {

	private final ItemStore store;

	public ItemController(ItemStore store) {
		this.store = store;
	}

	@GetMapping
	public List<Item> findAll() {
		return store.findAll();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Item create(@RequestBody ItemRequest request) {
		return store.create(validName(request.name()));
	}

	@PutMapping("/{id}")
	public Item rename(@PathVariable Long id, @RequestBody ItemRequest request) {
		Item item = store.rename(id, validName(request.name()));
		if (item == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item " + id + " not found");
		}
		return item;
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		if (!store.delete(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item " + id + " not found");
		}
	}

	private String validName(String name) {
		if (name == null || name.isBlank()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name must not be blank");
		}
		return name.trim();
	}

	public record ItemRequest(String name) {
	}
}
