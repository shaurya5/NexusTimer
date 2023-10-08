import Reload from "@/icons/Reload";
import Select from "./Select";
import Settings from "@/icons/Settings";
import { useSettingsModalStore } from "@/store/SettingsModalStore";
import { useTimerStore } from "@/store/timerStore";
import translation from "@/translations/global.json";
import HeaderOption from "./HeaderOption";

export default function HeaderTimer() {
  const { scramble, selectedCube, setNewScramble } = useTimerStore();
  const { setSettingsOpen, settingsOpen, settings } = useSettingsModalStore();
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-4">
      <div className="flex items-center gap-3">
        <HeaderOption
          icon={<Settings />}
          handleClick={() => setSettingsOpen(!settingsOpen)}
        />
        <Select />
        <HeaderOption
          icon={<Reload />}
          handleClick={() => {
            if (selectedCube) {
              setNewScramble(selectedCube);
            }
          }}
        />
      </div>
      <div className="h-auto p-2 overflow-auto text-2xl font-medium text-center rounded-md min-w-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg max-h-52 bg-zinc-900">
        {selectedCube
          ? scramble
          : translation.timer["empty-scramble"][settings.locale[0].lang]}
      </div>
    </div>
  );
}
