import { PathOrFileDescriptor, readFileSync } from "fs";

const enum Round_Winner {
    Player_1 = 1,
    Player_2 = 2,
    Draw = 3,
}

enum Player_1_Mappings {
    X = 'rock',
    Y = 'paper',
    Z = 'scissors',
}

enum Player_2_Mappings {
    A = 'rock',
    B = 'paper',
    C = 'scissors',
}

enum Point_Values {
    Rock = 1,
    Paper = 2,
    Scissors = 3,
    Round_Loss = 0,
    Round_Draw = 3,
    Round_Win = 6,
}

export function run_test(input_file_index: number): void {
    const input_filepaths: ReadonlyArray<PathOrFileDescriptor> = [
        './src/02/input_files/input_1.txt',
    ];
    const input_file: PathOrFileDescriptor = input_filepaths[input_file_index];
    const day_02_result: number = execute(input_file);
    console.log(day_02_result);
}

function execute(input_filepath: PathOrFileDescriptor): number {
    const input_file_lines: ReadonlyArray<string> = readFileSync(input_filepath, 'utf-8').split('\r\n');
    let total_points: number = 0;

    for (let round_index = 0; round_index < input_file_lines.length; round_index++) {
        const round_line: string = input_file_lines[round_index];

        if (round_line.length !== 3) {
            throw new Error('Invalid round line');
        }
        if (!(Object.keys(Player_1_Mappings).includes(round_line.charAt(2)))) {
            throw new Error('Invalid player 1 choice');
        }
        if (!(Object.keys(Player_2_Mappings).includes(round_line.charAt(0)))) {
            throw new Error('Invalid player 2 choice');
        }

        const player_1_choice: Player_1_Mappings = Player_1_Mappings[round_line.charAt(2) as keyof typeof Player_1_Mappings];
        const player_2_choice: Player_2_Mappings = Player_2_Mappings[round_line.charAt(0) as keyof typeof Player_2_Mappings];
        const round_result: Round_Winner = get_round_result(player_1_choice, player_2_choice);

        total_points += get_round_points(round_result, player_1_choice);
    }
    
    return total_points;
}

function get_round_points(round_result: Round_Winner, player_1_choice: Player_1_Mappings): number {
    let points: number = 0;
    switch (round_result) {
        case Round_Winner.Player_1:
            points += Point_Values.Round_Win.valueOf();
            break;
        case Round_Winner.Player_2: 
            points += Point_Values.Round_Loss.valueOf();
            break;
        case Round_Winner.Draw:
            points += Point_Values.Round_Draw.valueOf();
            break;
        default:
            break;
    }
    switch (player_1_choice) {
        case Player_1_Mappings.X:
            points += Point_Values.Rock.valueOf();
            break;
        case Player_1_Mappings.Y:
            points += Point_Values.Paper.valueOf();
            break;
        case Player_1_Mappings.Z:
            points += Point_Values.Scissors.valueOf();
            break;
        default:
            break;
    }
    return points;
}

function get_round_result(player_1_choice: Player_1_Mappings, player_2_choice: Player_2_Mappings): Round_Winner {
    if (player_1_choice.valueOf() === 'rock' && player_2_choice.valueOf() === 'scissors') {
        return Round_Winner.Player_1;
    }
    else if (player_1_choice.valueOf() === 'rock' && player_2_choice.valueOf() === 'paper') {
        return Round_Winner.Player_2;
    }
    else if (player_1_choice.valueOf() === 'paper' && player_2_choice.valueOf() === 'rock') {
        return Round_Winner.Player_1;
    }
    else if (player_1_choice.valueOf() === 'paper' && player_2_choice.valueOf() === 'scissors') {
        return Round_Winner.Player_2;
    }
    else if (player_1_choice.valueOf() === 'scissors' && player_2_choice.valueOf() === 'paper') {
        return Round_Winner.Player_1;
    }
    else if (player_1_choice.valueOf() === 'scissors' && player_2_choice.valueOf() === 'rock') {
        return Round_Winner.Player_2;
    }

    return Round_Winner.Draw;
}