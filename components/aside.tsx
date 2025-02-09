import { ConnectKitButton } from "connectkit";

export function Aside() {
  return (
    <aside className='hidden lg:block'>
      <div className='border border-gray-100 rounded-lg p-4 mb-4'>
        <h2 className='font-bold text-xl mb-2'>CurateAI Community</h2>
        <p className='text-gray-600 text-[14px] mb-4'>
          Share your content, retain ownership, and earn SMT coins based on
          engagement.
        </p>
        <div className='space-y-2'>
          <ConnectKitButton.Custom>
            {({ isConnected, show }) => (
              <button
                onClick={show}
                className='w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-[14px]'>
                {isConnected ? "Connected" : "Connect Wallet"}
              </button>
            )}
          </ConnectKitButton.Custom>
          <button className='w-full py-2 px-4 text-blue-600 rounded-lg hover:bg-blue-50 text-[14px]'>
            Create Post
          </button>
        </div>
      </div>

      <div className='border border-gray-100 rounded-lg overflow-hidden'>
        <h2 className='font-bold px-4 py-3 border-b border-gray-100'>
          #discuss
        </h2>
        <div className='divide-y divide-gray-100'>
          {[1, 2, 3].map((i) => (
            <a key={i} href='#' className='block p-4 hover:bg-gray-50'>
              <h3 className='text-[16px] font-medium text-gray-900 hover:text-blue-600'>
                What was your win this week?
              </h3>
              <span className='text-[14px] text-gray-600'>32 comments</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
