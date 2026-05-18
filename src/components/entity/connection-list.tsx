type ConnectionItem = {
  connection_id: string;
  connection_type: string;
  strength: number;
  related_entity_id: string;
  related_display_name: string;
  related_identifier: string;
  related_type: string;
};

export function ConnectionList({ items }: { items: ConnectionItem[] }) {
  if (!items.length) {
    return <p className="text-white/45">No connections detected yet.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.connection_id}
          className="border border-white/10 bg-slate-950/50 p-5"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
            {item.connection_type}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            {item.related_display_name}
          </h3>
          <p className="mt-1 text-sm text-white/55">{item.related_identifier}</p>
          <p className="mt-2 text-sm text-white/60">
            {item.related_type} - strength {Number(item.strength).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
