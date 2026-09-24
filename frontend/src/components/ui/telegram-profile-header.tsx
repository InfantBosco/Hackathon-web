import * as React from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TelegramHeaderProps {
  avatar: string;
  name: string;
  phone?: string;
  username?: string;
  actionButton?: {
    text: string;
    onClick?: () => void;
    backgroundColor?: string;
  };
}

export function TelegramHeader({
  avatar,
  name,
  phone,
  username,
  actionButton = {
    text: "Chief Guest",
    onClick: () => {},
    backgroundColor: "rgb(255,112,0)"
  }
}: TelegramHeaderProps) {
  // Default to expanded state so the big photo and name are displayed immediately
  const [expand, setExpand] = React.useState(true);

  return (
    <MotionConfig
      transition={{
        duration: 0.4,
        type: "spring",
        bounce: 0.2,
      }}
    >
      <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl overflow-hidden rounded-[32px] shadow-[0_0_50px_rgba(255,255,255,0.15)] border-2 border-white/30">
        {actionButton && actionButton.text && (
          <motion.button
            className={cn(
              "text-white absolute z-30 rounded-full px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-lg transition-transform hover:scale-105",
              expand ? "top-5 right-5" : "top-5 right-5"
            )}
            initial={{ right: 20 }}
            animate={{
              right: 20,
              background: actionButton.backgroundColor || "rgb(255,112,0)",
              color: "rgb(255, 255, 255)",
            }}
            onClick={actionButton.onClick}
          >
            {actionButton.text}
          </motion.button>
        )}

        <motion.header
          layout
          style={{ aspectRatio: expand ? "4/5" : undefined }}
          className={cn(
            "relative isolate flex flex-col transition-all duration-300 overflow-hidden",
            expand
              ? "mt-0 items-start justify-end p-6 sm:p-8 rounded-[32px] min-h-[420px] sm:min-h-[500px]"
              : "mt-4 items-center justify-center p-8 bg-[#0c0e1a]/95 backdrop-blur-xl rounded-[32px]"
          )}
        >
          {/* Collapsed Small Avatar (if collapsed) */}
          {!expand && (
            <motion.button
              layoutId="user-avatar"
              className="relative flex aspect-square w-28 sm:w-32 items-center justify-center overflow-hidden cursor-pointer border-2 border-white/30 shadow-xl"
              onClick={() => setExpand(!expand)}
              style={{
                borderRadius: 36,
              }}
            >
              <img
                src={avatar}
                alt={name}
                className="pointer-events-none h-full w-full object-cover"
              />
            </motion.button>
          )}

          {/* Name & Overlay Content */}
          <motion.div
            className={`relative z-20 flex flex-col ${expand ? "items-start" : "items-center"} mt-3`}
          >
            <motion.h2
              layout
              className="inline-block text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white tracking-tight drop-shadow-md"
            >
              {name}
            </motion.h2>
            {(phone || username) && (
              <motion.div
                layout
                className="flex gap-1.5 text-xs sm:text-sm text-slate-200 mt-1 font-sans font-medium"
              >
                {phone && <p className="tracking-tight">{phone}</p>}
                {phone && username && <span>•</span>}
                {username && <p>{username}</p>}
              </motion.div>
            )}
          </motion.div>

          {/* Expanded Background Photo View */}
          <AnimatePresence>
            {expand && (
              <motion.button
                layoutId="user-avatar"
                className="absolute inset-0 -z-10 h-full w-full overflow-hidden cursor-pointer"
                style={{ borderRadius: 0 }}
                onClick={() => setExpand(!expand)}
              >
                <img
                  src={avatar}
                  alt={name}
                  className="pointer-events-none h-full w-full object-cover object-top"
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-44 w-full bg-gradient-to-t from-black/95 via-black/50 to-transparent"
                />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.header>
      </div>
    </MotionConfig>
  );
}
