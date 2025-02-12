import { useQuery } from "@tanstack/react-query";
import { useTodos } from "../hooks/useTodos";
import { supabase } from "../supabase/client";
import JSConfetti from "js-confetti";
import { useEffect, useRef } from "react";

const confetti = new JSConfetti();

export function ProgressBar() {
  const ref = useRef(null);
  const { count } = useTodos({ page: 1 });
  const query = useQuery({
    queryKey: ['todos', 'done'],
    queryFn: async () => {
      const { count } = await supabase.from('todos')
        .select('*', { count: 'exact' })
        .eq('done', true);
      return count;
    }
  });

  const width = `${((query.data ?? 0) / count) * 100}%`;

  useEffect(() => {
    if (count !== 0 && count === query.data) {
      confetti.addConfetti({
        emojiSize: 60,
        confettiNumber: 200,
      });
    }
  }, [count, query.data, ref]);

  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{query.data ?? 0} de {count} todos completed</p>
      <div className="h-2 w-full bg-gray-600 rounded-full overflow-hidden">
        <div style={{ width }} className="h-full bg-blue-500 transition-all"></div>
      </div>
    </div>
  )
}