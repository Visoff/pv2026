package com.example.backend;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

@Service
public class ItemStore {

	private final Map<Long, Item> items = new ConcurrentHashMap<>();
	private final AtomicLong nextId = new AtomicLong(1);

	public List<Item> findAll() {
		return items.values().stream()
				.sorted(Comparator.comparing(Item::id))
				.toList();
	}

	public Item create(String name) {
		Item item = new Item(nextId.getAndIncrement(), name);
		items.put(item.id(), item);
		return item;
	}

	public Item rename(Long id, String name) {
		return items.computeIfPresent(id, (key, item) -> new Item(key, name));
	}

	public boolean delete(Long id) {
		return items.remove(id) != null;
	}
}
