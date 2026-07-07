export interface Horario {
    id_horario?: number;
    id_curso: number;
    id_aula: number;
    dia_semana: string;
    hora_inicio: string;
    hora_fin: string;
    estado?: boolean;
}