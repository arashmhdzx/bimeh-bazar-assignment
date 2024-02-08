import { useQuery, useMutation, useQueryClient, QueryFunction, MutationFunction } from '@tanstack/react-query';

type QueryFunctionType<T> = QueryFunction<T>;
type MutationFunctionType<T, R> = MutationFunction<T, R>;

export function useRequestProcessor() {
    const queryClient = useQueryClient();

    function Query<T>(key: string, queryFunction: QueryFunctionType<T>, options = {}) {
        return useQuery<T>({
            queryKey: [key],
            queryFn: queryFunction,
            ...options,
        });
    }

    function Mutate<T, R>(key: string, mutationFunction: MutationFunctionType<T, R>, options = {}) {
        return useMutation<T, unknown, R>({
            mutationKey: [key],
            mutationFn: mutationFunction,
            onSettled:() => queryClient.invalidateQueries(),
            ...options,
        });
    }

    return { Query, Mutate };
}
