import { PathOrFileDescriptor, readFileSync } from "fs";

export function run_test(input_file_index: number): void {
    const input_filepaths: ReadonlyArray<PathOrFileDescriptor> = [
        './src/01/input_files/input_1.txt',
    ];
    const input_file: PathOrFileDescriptor = input_filepaths[input_file_index];

    const day_01_result: number = execute(input_file);
    console.log(day_01_result);
}

function execute(input_filepath: PathOrFileDescriptor): number {
    const input_file_lines: ReadonlyArray<string> = readFileSync(input_filepath, 'utf-8').split('\r\n');
    let highest_sum: number = 0;
    let current_sum: number = 0;
    for (let line_index = 0; line_index < input_file_lines.length; line_index++) {
        const current_line = input_file_lines[line_index];
        if (current_line === '') {
            highest_sum = highest_sum < current_sum ? current_sum : highest_sum;
            current_sum = 0;
            continue;
        }
        else if (line_index === input_file_lines.length - 1) {
            current_sum += parseInt(current_line);
            highest_sum = highest_sum < current_sum ? current_sum : highest_sum;
            break;
        }
        current_sum += parseInt(current_line);
    }
    return highest_sum;
}