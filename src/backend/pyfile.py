from pytube import YouTube

def download_video(url, output_path='.'):
    try:
        # Create a YouTube object
        yt = YouTube(url)

        # Get the highest resolution stream (mp4)
        video_stream = yt.streams.get_highest_resolution()

        # Specify the output path (default is the current directory)
        output_path = output_path or '.'

        # Download the video
        video_stream.download(output_path)

        print(f"Video '{yt.title}' downloaded successfully.")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    # Prompt user for YouTube video URL
    video_url = input("Enter YouTube video URL: ")

    # Prompt user for output directory (optional)
    output_directory = input("Enter output directory (press Enter for current directory): ")

    # Download the video
    download_video(video_url, output_directory)
