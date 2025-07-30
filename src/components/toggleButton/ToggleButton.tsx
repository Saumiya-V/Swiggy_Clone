import { Button } from '@/components/ui/button'; 

export default function ToggleButton({selected, setSelected}: {selected: string, setSelected:(value: "Restaurants" | "Dishes") => void}) {

  return (
    <div className="w-55 ml-82 rounded-3xl  flex justify-between border-3 mb-5 ">
      <Button
        onClick={() => setSelected('Restaurants')}
        className={`rounded-3xl px-4 py-2 transition-all hover:bg-white hover:text-black ${
          selected === 'Restaurants' ? 'bg-black text-white hover:bg-black hover:text-white' : 'bg-white text-black'
        }`}
      >
        Restaurants
      </Button>
      <Button
        onClick={() => setSelected('Dishes')}
        className={`rounded-3xl px-7 py-2 transition-all hover:bg-white hover:text-black ${
          selected === 'Dishes' ? 'bg-black text-white hover:bg-black hover:text-white' : 'bg-white text-black'
        }`}
      >
        Dishes
      </Button>
    </div>
  );
}
