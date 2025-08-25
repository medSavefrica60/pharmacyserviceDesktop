import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import create, { SetState, GetState } from "zustand";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Trash2, Edit2, Plus, Search, Loader2 } from "lucide-react";

type Todo = { id: string; text: string; done: boolean };

type TodoState = {
  todos: Todo[];
  add: (text: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  edit: (id: string, text: string) => void;
  setTodos: (t: Todo[]) => void;
};

const useTodoStore = create<TodoState>(
  (set: SetState<TodoState>, get: GetState<TodoState>) => ({
    todos: [],
    add: (text: string) => {
      const next: Todo = { id: Date.now().toString(), text, done: false };
      set({ todos: [next, ...get().todos] });
    },
    toggle: (id: string) =>
      set({
        todos: get().todos.map((t: Todo) =>
          t.id === id ? { ...t, done: !t.done } : t,
        ),
      }),
    remove: (id: string) =>
      set({ todos: get().todos.filter((t: Todo) => t.id !== id) }),
    edit: (id: string, text: string) =>
      set({
        todos: get().todos.map((t: Todo) => (t.id === id ? { ...t, text } : t)),
      }),
    setTodos: (t: Todo[]) => set({ todos: t }),
  }),
);

// Small helper to load from localStorage safely
function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem("todos");
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

export default function App(): React.ReactElement {
  const todos = useTodoStore((s: TodoState) => s.todos);
  const add = useTodoStore((s: TodoState) => s.add);
  const toggle = useTodoStore((s: TodoState) => s.toggle);
  const remove = useTodoStore((s: TodoState) => s.remove);
  const edit = useTodoStore((s: TodoState) => s.edit);
  const setTodos = useTodoStore((s: TodoState) => s.setTodos);

  // State for edit dialog
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");

  // react-hook-form for adding todos
  const { register, handleSubmit, reset } = useForm<{ todo: string }>();

  // react-hook-form for pokemon search
  const {
    register: registerPoke,
    handleSubmit: handlePokeSubmit,
    reset: resetPoke,
  } = useForm<{ q: string }>();

  // pokemon state
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [loadingPoke, setLoadingPoke] = useState(false);
  const [pokeError, setPokeError] = useState<string | null>(null);

  // mounted ref to avoid state updates after unmount
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // load todos on mount from localStorage into the zustand store
  useEffect(() => {
    const saved = loadTodos();
    if (saved.length) setTodos(saved);
  }, [setTodos]);

  // persist to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch {
      // ignore
    }
  }, [todos]);

  // add todo handler using react-hook-form
  function onAdd(values: { todo: string }) {
    const text = values.todo?.trim();
    if (!text) return;
    add(text);
    reset();
  }

  // pokemon search: fetch from pokeapi
  async function fetchPokemon(nameOrId: string) {
    setPokeError(null);
    setPokemon(null);
    setLoadingPoke(true);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(
          nameOrId.toLowerCase(),
        )}`,
      );
      if (!res.ok) throw new Error(`Pokemon not found: ${res.status}`);
      const data = await res.json();
      if (!mounted.current) return;
      setPokemon({
        name: data.name,
        sprite: data.sprites?.front_default,
        types: data.types?.map((t: any) => t.type.name),
      });
    } catch (err: any) {
      if (!mounted.current) return;
      setPokeError(err?.message ?? "Unknown error");
    } finally {
      if (mounted.current) setLoadingPoke(false);
    }
  }

  function onPokeSearch(values: { q: string }) {
    const q = values.q?.trim();
    if (!q) return;
    fetchPokemon(q);
    resetPoke();
  }

  const remaining = todos.filter((t: Todo) => !t.done).length;

  const handleEditSave = () => {
    if (editingTodo && editText.trim()) {
      edit(editingTodo.id, editText.trim());
      setEditingTodo(null);
      setEditText("");
    }
  };

  return (
    <div className="bg-background min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Todo + Pokémon</h1>
          <p className="text-muted-foreground">
            Zustand for todos, react-hook-form for inputs, fetch Pokémon API
          </p>
        </div>

        {/* Todo Section */}
        <Card>
          <CardHeader>
            <CardTitle>Todo List</CardTitle>
            <CardDescription>
              Manage your tasks with local storage persistence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Todo Form */}
            <form onSubmit={handleSubmit(onAdd)} className="flex gap-2">
              <Input
                {...register("todo")}
                placeholder="What needs doing?"
                className="flex-1"
              />
              <Button type="submit">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </form>

            {/* Summary */}
            <div className="text-muted-foreground flex gap-4 text-sm">
              <Badge variant="secondary">{remaining} remaining</Badge>
              <Badge variant="outline">{todos.length} total</Badge>
            </div>

            {/* Todo List */}
            {todos.length === 0 ? (
              <Alert>
                <AlertDescription>
                  No todos yet — add one above to get started.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2">
                {todos.map((todo: Todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 rounded-lg border p-3 ${
                      todo.done ? "bg-muted/50" : "bg-card"
                    }`}
                  >
                    <Checkbox
                      checked={todo.done}
                      onCheckedChange={() => toggle(todo.id)}
                    />
                    <span
                      className={`flex-1 ${
                        todo.done ? "text-muted-foreground line-through" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                    <div className="flex gap-1">
                      <Dialog
                        open={editingTodo?.id === todo.id}
                        onOpenChange={(open) => {
                          if (open) {
                            setEditingTodo(todo);
                            setEditText(todo.text);
                          } else {
                            setEditingTodo(null);
                            setEditText("");
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Todo</DialogTitle>
                            <DialogDescription>
                              Make changes to your todo item.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-text">Todo</Label>
                              <Input
                                id="edit-text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                placeholder="Enter todo text"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setEditingTodo(null);
                                setEditText("");
                              }}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleEditSave}>Save</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => remove(todo.id)}
                      >
                        <Trash2 className="text-destructive h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* Pokemon Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search Pokémon</CardTitle>
            <CardDescription>
              Find information about any Pokémon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form
              onSubmit={handlePokeSubmit(onPokeSearch)}
              className="flex gap-2"
            >
              <Input
                {...registerPoke("q")}
                placeholder="Name or ID (e.g., pikachu or 25)"
                className="flex-1"
              />
              <Button type="submit" disabled={loadingPoke}>
                {loadingPoke ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Search
              </Button>
            </form>

            {/* Pokemon Results */}
            {loadingPoke && (
              <Alert>
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertDescription className="ml-2">
                  Loading Pokémon data...
                </AlertDescription>
              </Alert>
            )}

            {pokeError && (
              <Alert variant="destructive">
                <AlertDescription>{pokeError}</AlertDescription>
              </Alert>
            )}

            {pokemon && (
              <Card>
                <CardContent className="flex items-center gap-4 pt-6">
                  {pokemon.sprite && (
                    <img
                      src={pokemon.sprite}
                      alt={pokemon.name}
                      className="bg-muted h-24 w-24 rounded-lg p-2"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold capitalize">
                      {pokemon.name}
                    </h3>
                    <div className="flex gap-2">
                      {pokemon.types?.map((type: string) => (
                        <Badge key={type} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => add(`Catch ${pokemon.name}`)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add as todo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-muted-foreground pb-4 text-center text-sm">
          Local-only demo: todos persist to localStorage; Pokémon data from
          pokeapi.co.
        </footer>
      </div>
    </div>
  );
}
