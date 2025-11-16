export default async function Page() {
  const res = await fetch("http://localhost:3333/categories", {
    // Garante que a chamada não será cacheada no App Router
    cache: "no-store",
  });

  const json = await res.json();
  const categories = json.data;

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Categorias</h1>

      <div style={{ marginTop: 20 }}>
        {categories.length === 0 ? (
          <p>Nenhuma categoria encontrada.</p>
        ) : (
          <ul style={{ lineHeight: "28px" }}>
            {categories.map((cat: any) => (
              <li key={cat.id}>{cat.name}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
