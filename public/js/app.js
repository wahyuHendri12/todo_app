let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    tasks = JSON.parse(document.getElementById("tasks-data").textContent);

    const list = document.getElementById("task-list");
    setTimeout(() => list.classList.add("no-anim"), 1200);

    document.getElementById("form-add").addEventListener("submit", onAdd);
    list.addEventListener("submit", onListSubmit);
});

async function onAdd(e) {
    e.preventDefault();
    const input = document.getElementById("input-title");
    const title = input.value.trim();
    if (!title) return;

    try {
        const res = await fetch("/tasks", {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: new URLSearchParams({ title })
        });
        const data = await res.json();

        if (!data.success) throw new Error();

        tasks.unshift(data.task);
        renderList(data.task.id);
        updateSummary();
        input.value = "";
        input.focus();
    } catch {
        alert("Gagal menambahkan tugas. Coba lagi.");
    }
}

async function onListSubmit(e) {
    const form = e.target.closest("form");
    if (!form) return;
    e.preventDefault();

    const item = form.closest(".task-item");
    const id = Number(item.dataset.id);

    if (form.classList.contains("form-delete")) {
        if (!confirm("Yakin ingin menghapus tugas ini?")) return;

        try {
            const res = await fetch(`/tasks/${id}/delete`, {
                method: "POST",
                headers: { "Accept": "application/json" }
            });
            const data = await res.json();
            if (!data.success) throw new Error();

            tasks = tasks.filter(t => t.id !== id);
            item.classList.add("removing");
            item.addEventListener("transitionend", () => {
                item.remove();
                if (tasks.length === 0) toggleEmpty(true);
            }, { once: true });
            updateSummary();
        } catch {
            alert("Gagal menghapus tugas. Coba lagi.");
        }
    } else {
        try {
            const res = await fetch(`/tasks/${id}/toggle`, {
                method: "POST",
                headers: { "Accept": "application/json" }
            });
            const data = await res.json();
            if (!data.success) throw new Error();

            const task = tasks.find(t => t.id === id);
            task.is_done = task.is_done ? 0 : 1;
            item.classList.toggle("done", !!task.is_done);
            form.querySelector(".btn-done").textContent = task.is_done ? "Urungkan" : "Selesai";
            updateSummary();
        } catch {
            alert("Gagal memperbarui tugas. Coba lagi.");
        }
    }
}

function renderList(highlightId = null) {
    const list = document.getElementById("task-list");
    list.classList.add("no-anim");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item" + (task.is_done ? " done" : "");
        li.dataset.id = task.id;
        if (task.id === highlightId) li.classList.add("item-new");

        const span = document.createElement("span");
        span.className = "task-title";
        span.textContent = task.title;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const formToggle = document.createElement("form");
        formToggle.action = `/tasks/${task.id}/toggle`;
        formToggle.method = "POST";
        formToggle.className = "form-toggle";

        const btnDone = document.createElement("button");
        btnDone.type = "submit";
        btnDone.className = "btn-done";
        btnDone.textContent = task.is_done ? "Urungkan" : "Selesai";
        formToggle.appendChild(btnDone);

        const formDelete = document.createElement("form");
        formDelete.action = `/tasks/${task.id}/delete`;
        formDelete.method = "POST";
        formDelete.className = "form-delete";

        const btnDelete = document.createElement("button");
        btnDelete.type = "submit";
        btnDelete.className = "btn-delete";
        btnDelete.title = "Hapus tugas";
        btnDelete.innerHTML = "&times;";
        formDelete.appendChild(btnDelete);

        actions.append(formToggle, formDelete);
        li.append(span, actions);
        list.appendChild(li);
    });

    toggleEmpty(tasks.length === 0);
}

function updateSummary() {
    const badge = document.getElementById("task-badge");
    const section = document.getElementById("progress-section");
    const text = document.getElementById("progress-text");
    const fill = document.getElementById("progress-fill");

    badge.textContent = tasks.length;

    if (tasks.length === 0) {
        section.hidden = true;
        return;
    }

    const doneCount = tasks.filter(t => t.is_done).length;
    section.hidden = false;
    text.textContent = `${doneCount}/${tasks.length} selesai`;
    fill.style.width = Math.round(doneCount / tasks.length * 100) + "%";
}

function toggleEmpty(show) {
    document.getElementById("empty-state").hidden = !show;
    document.getElementById("task-list").hidden = show;
}
