import { Header } from "../components/Header.tsx";

export default function AboutPage() {
    return (
      <>
      <Header/>
      <div class="flex flex-row justify-center mt-8 dark:text-white">
        <div>
          <p class="m-1">This is not an official Games Workshop website.</p>
          <p class="m-1">If you want to contact me, mail the idiot machine (all one word) at gmail dot com, or join the London Warhammer Gaming Guild.</p>
          <p class="m-1">Shout outs to:</p>
          <p class="m-1"><a href="https://www.meetup.com/the-london-warhammer-gaming-guild/">The London Warhammer Gaming Guild</a></p>
          <p class="m-1"><a href="https://www.youtube.com/@LItbashing">Litbashing</a></p>
          <p class="m-1"><a href="https://www.goonhammer.com/author/henryc/">NotThatHenryC at Goonhammer</a></p>
          <p class="m-1"><a href="https://www.youtube.com/@ModelPaintWhatever">Model Paint Whatever</a></p>
        </div>
      </div>
      </>
    );
  }